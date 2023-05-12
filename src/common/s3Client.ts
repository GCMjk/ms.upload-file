import { Injectable } from '@nestjs/common';
import { S3 } from '@aws-sdk/client-s3';

@Injectable()
export class s3Client {
  public readonly s3: S3;

  constructor() {
    this.s3 = new S3({
      forcePathStyle: false,
      endpoint: `https://${process.env.AWS_REGION}.${process.env.DO_URL}`,
      region: 'us-east-1',
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });
  }
}