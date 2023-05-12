import { Module } from '@nestjs/common';
import { s3Client } from '@/common/s3Client';

import { UploadFileService } from './upload-file.service';
import { UploadFileController } from './upload-file.controller';

@Module({
  providers: [UploadFileService, s3Client],
  controllers: [UploadFileController]
})
export class UploadFileModule {}
