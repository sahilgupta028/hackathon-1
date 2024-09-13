import { createClient } from "redis";
import { Queue, Worker, QueueEvents, Job } from "bullmq";
import IORedis from 'ioredis';
import { PrismaClient } from "@prisma/client";
import axios from "axios";

export type Data = {
    name: string;
    email?: string;
    phone?: string;
    patientId: string;
    dob?: string;
    gender?: string;
}


// create a localhost redis client
export const client = createClient({
  url: "redis://localhost:6379",
});

export const connection = new IORedis({
    host: 'localhost',
    port: 6379,
    maxRetriesPerRequest: null,
});


client.connect().catch(console.error);
client.on("error", console.error)
.on("connect", () => {
    console.table("Connected to Redis");
})
.on("end", () => {
    console.table("Disconnected from Redis");
})
.on("reconnecting", () => {
    console.table("Reconnecting to Redis");
})
.on("ready", () => {
    console.table("Redis is ready");
})
.on("warning", () => {
    console.table("Redis warning");
});

// create a new queue with the name "queue"
export const queue = new Queue("queue");


// add a job to the queue and return the job id to the caller
export async function addJob(data: Data): Promise<string> {
    const job = await queue.add("job", { data: data }, { removeOnComplete: true, removeOnFail: true, removeDependencyOnFailure: true });
    console.table(job.id);
    return job.id as string;
}


// create a worker for the queue
export const worker = new Worker(
  "queue",
  async (job: Job) => {
    console.table(job.data);

    await job.updateProgress(42);

    await job.updateProgress({ state: 'completed' });

    await processQueue(job);

  },
  {
    connection: connection,
  }
);

worker.on('completed', job => {
    console.table(`${job.id} has completed!`);
  });
  
  worker.on('failed', (job, err) => {
    console.table(`${job?.id} has failed with ${err.message}`);
});


// create a queue event listener
export const queueEvents = new  QueueEvents("queue");

queueEvents.on('waiting', ({ jobId }) => {
    console.table(`A job with ID ${jobId} is waiting`);
  });
  
  queueEvents.on('active', ({ jobId, prev }) => {
    console.table(`Job ${jobId} is now active; previous status was ${prev}`);
  });
  
  queueEvents.on('completed', ({ jobId, returnvalue }) => {
    console.table(`${jobId} has completed and returned ${returnvalue}`);
  });
  
  queueEvents.on('failed', ({ jobId, failedReason }) => {
    console.table(`${jobId} has failed with reason ${failedReason}`);
  });

  queueEvents.on('progress', ({ jobId, data }, timestamp) => {
    console.table(`${jobId} reported progress ${data} at ${timestamp}`);
  });

  async function processQueue(job: Job){
    console.table(job.data);
    await job.updateProgress(42);
    await job.updateProgress({ state: 'completed' });

    const data = await job.data 

    console.table(data);

    const prisma = new PrismaClient();
    try {
        
        const patient = await axios.get(`http://localhost:3000/api/patients?${data.patientId}`);

        if(patient.status !== 200){
            // create new patient
            const newPatient = await axios.post(`http://localhost:3000/api/patients`, data);
            if(newPatient.status === 201){
                console.table("New patient created");
            }
            throw new Error("Failed to create patient");
        }

        // create appointment
        const appointment = await prisma.appointment.create({
            data: {
                patientId: data.id,
                doctorId: "1",
                date: new Date()
            }
        })

        console.table(appointment);

        await job.updateProgress({ state: 'completed' });

        return 'completed';

    } catch (error) {
        console.error(error);
        await job.updateProgress({ state: 'failed' });
    }
}