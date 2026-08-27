export { zodResolver } from '@hookform/resolvers/zod';
export { z } from 'zod';

import { z } from 'zod';

export const zRequired = (message = 'Trường này là bắt buộc') =>
  z.string({ message }).trim().min(1, message);

export const zEmail = (message = 'Email không hợp lệ') => z.string({ message }).email(message);

export const zPhone = (message = 'Số điện thoại không hợp lệ') =>
  z.string({ message }).regex(/^(0|\+84)[3-9]\d{8}$/, message);

export const zPassword = (message = 'Mật khẩu tối thiểu 8 ký tự') =>
  z.string({ message }).min(8, message);

/** Nullable date — use .refine(d => d !== null, 'Required') when the field is required */
export const zDate = () => z.date().nullable();

export const zDateRequired = (message = 'Vui lòng chọn ngày') =>
  z
    .date()
    .nullable()
    .refine((d) => d !== null, message);

export const zOptional = <T extends z.ZodType>(schema: T) => schema.optional().nullable();

export const zFile = (opts?: { maxSizeMB?: number; accept?: string[] }) =>
  z
    .instanceof(File)
    .refine(
      (f) => !opts?.maxSizeMB || f.size <= opts.maxSizeMB * 1024 * 1024,
      `File không được vượt quá ${opts?.maxSizeMB ?? 10}MB`,
    )
    .refine(
      (f) => !opts?.accept || opts.accept.some((type) => f.type.startsWith(type)),
      'Định dạng file không hợp lệ',
    )
    .nullable();

export const zServerFileV2 = z.object({
  fileId: z.union([z.number(), z.string()]),
  fileName: z.string(),
  fileUrl: zOptional(z.string()),
  objectKey: zOptional(z.string()),
  fileSize: zOptional(z.number()),
});
export type ServerFile = z.infer<typeof zServerFileV2>;

export const zServerFile = z.object({
  fileName: z.string(),
  fileSize: z.number(),
  fileSource: z.string(),
});

export const zStringOrNumber = z.union([z.string(), z.number()]);

export const zPositiveNumber = (
  message = 'Trường này là bắt buộc',
  numMessage = 'Giá trị phải là một số',
  posMessage = 'Giá trị phải lớn hơn 0',
) =>
  z
    .string({ message })
    .trim()
    .min(1, message)
    .refine((val) => !isNaN(Number(val)), numMessage)
    .refine((val) => Number(val) > 0, posMessage);

export const zCodeRequired = (
  message = 'Trường này là bắt buộc',
  whiteSpaceMessage = 'Giá trị không được chứa khoảng trắng',
) => zRequired(message).regex(/^\S+$/, whiteSpaceMessage);
