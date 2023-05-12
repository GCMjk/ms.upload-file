import { IFile } from '@/common/interfaces/file.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path';

import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from '@common/s3Client';

@Injectable()
export class UploadFileService {

    constructor(private readonly s3Client: s3Client) {}

    async create ({ file, route, extensions }: { file: any, route: string[], extensions: string[] }): Promise<IFile> {
        
        const routeDO = path.join(...route);
        const extension = path.extname(file.originalname);

        if (!extensions.includes(extension.slice(1))) {
            throw new HttpException('Invalid file extension', HttpStatus.BAD_REQUEST);
        }
        
        const params = {
            ACL: 'public-read',
            Bucket: process.env.BUCKET_NAME,
            Key: `${routeDO}${extension}`,
            Body: file.buffer,
            ContentLength: file.size,
            ContentType: file.mimetype
        };

        const { ETag } = await this.s3Client.s3.send(new PutObjectCommand(params));

        const iFile: IFile = {
            ETag: ETag.substring(1, ETag.length - 1),
            key: params.Key,
            url: `https://${process.env.BUCKET_NAME}.${process.env.AWS_REGION}.${process.env.DO_URL}/${params.Key}`
        };

        return iFile;
    }
}
