import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { UploadFileMSG } from '@common/constants';
import { UploadFileService } from './upload-file.service';

@Controller()
export class UploadFileController {
    constructor(
        private readonly _uploadFileService: UploadFileService
    ) {}

    @MessagePattern(UploadFileMSG.UPLOAD)
    create(@Payload() payload) {
        return this._uploadFileService.create(payload);
    }

    @MessagePattern(UploadFileMSG.UPDATE)
    update() {
        //return this._userService.findAll();
    }

    @MessagePattern(UploadFileMSG.DELETE)
    delete(@Payload() id: string) {
        //return this._userService.findOne(id);
    }

}
