import { createClient } from "redis";
import { Queue, Worker, QueueEvents, Job } from "bullmq";
import IORedis from 'ioredis';
import { PrismaClient } from "@prisma/client";
import axios from "axios";
import { promises } from "dns";

export type Data = {
    name?: string;
    email?: string;
    phone?: string;
    patientId?: string;
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
    console.log("Connected to Redis");
})
.on("end", () => {
    console.log("Disconnected from Redis");
})
.on("reconnecting", () => {
    console.log("Reconnecting to Redis");
})
.on("ready", () => {
    console.log("Redis is ready");
})
.on("warning", () => {
    console.log("Redis warning");
})
.on("error", (err) => {
    if(err.code === "ECONNREFUSED"){
        console.error("Redis connection refused");
    }
    console.error(err);
});

// create a new queue with the name "queue"
export const queue = new Queue("queue");

// add a job to the queue and return the job id to the caller
export async function addJob(data: Data): Promise<string> {
    const job = await queue.add("queue", { data: data }, { removeOnComplete: true, removeOnFail: true, removeDependencyOnFailure: true });
    console.log("From Queue --> Job added to queue: ", job.id);
    return job.id as string;
}

// create a worker for the queue
export const worker = new Worker(
  "queue",
  async (job: Job) => {
    console.log("From Worker <---->", job.data);

    await job.updateProgress(42);

    await job.updateProgress({ state: 'completed' });

    console.log("Processing job from Worker: ", job.id);
    const result = await processQueue(job);
    if(result === "completed"){
      console.log("Worker Job completed: ", job.id);
        await job.updateProgress({ state: 'completed' });
    }

    return result;
  },
  {
    connection: connection,
  }
);

// worker.processJob = async (job: Job) => {
//     await processQueue(job);
// };

worker.on('completed', job => {
    console.log(`From Worker -->  ${job.id} has completed!`);
  });
  worker.on('progress', (job: Job, progress: number | object) => {
    // Do something with the return value.
    console.log(`From Worker -->  ${job.id} has progressed to ${progress}`);
  });
  
  worker.on('failed', (job, err) => {
    console.log(`From Worker -->  ${job?.id} has failed with ${err.message}`);
});
worker.on('error', (err) => {
    console.error("From Worker -->  ",err);
});


// create a queue event listener
export const queueEvents = new  QueueEvents("queue");

queueEvents.on('waiting', ({ jobId }) => {
    console.log(`From QueueEvents -->  A job with ID ${jobId} is waiting`);
  });
  
  queueEvents.on('active', ({ jobId, prev }) => {
    console.log(`From QueueEvents -->  Job ${jobId} is now active; previous status was ${prev}`);
  });
  
  queueEvents.on('completed', ({ jobId, returnvalue }) => {
    console.log(`From QueueEvents -->  ${jobId} has completed and returned ${returnvalue}`);
  });
  
  queueEvents.on('failed', ({ jobId, failedReason }) => {
    console.log(`From QueueEvents -->  ${jobId} has failed with reason ${failedReason}`);
  });

  queueEvents.on('progress', ({ jobId, data }, timestamp) => {
    console.log(`From QueueEvents -->  ${jobId} reported progress ${data} at ${timestamp}`);
  });

  async function processQueue(job: Job){
    console.log(job.data);
    await job.updateProgress(42);
    await job.updateProgress({ state: 'completed' });

    const data = await job.data 

    console.log("From Process -->  ",data);

    const prisma = new PrismaClient();
    try {

      // if patientId is not provided, create a new patient
        if(!data.patientId){
            console.log("Patient not found, creating new patient");
            // convert data to JSON object
            const json = {
                name: data.name,
                email: data.email,
                phone: data.phone,
            }
            // create new patient
            const newPatient = await axios.post(`http://localhost:3000/api/patients`, json);
            if(newPatient.status !== 201 && newPatient.status !== 200){
                throw new Error("Failed to create patient");
            }
        }
        
        const patient = await axios.get(`http://localhost:3000/api/patients?${data.patientId}`);
        if(patient.status !== 200){
            throw new Error("Failed to get patient");
        }

        // create appointment
        const appointment = await prisma.appointment.create({
            data: {
                patientId: data.id,
                doctorId: "1",
                date: new Date()
            }
        })

        console.log(appointment);

        await job.updateProgress({ state: 'completed' });

        return 'completed';

    } catch (error) {
        console.error(error);
        await job.updateProgress({ state: 'failed' });
    }
}