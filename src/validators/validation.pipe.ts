import { PipeTransform, BadRequestException } from '@nestjs/common';
import { UrlSchema } from '../url-shortener/types/url-shortener';

export class ValidatorPipe<T> implements PipeTransform<T> {
  public transform(value: T): T {
    const result = UrlSchema.validate(value);
    if (result.error) {
      const errorMessages = result.error.details.map((d) => d.message).join();
      throw new BadRequestException(errorMessages);
    }
    return value;
  }
}
