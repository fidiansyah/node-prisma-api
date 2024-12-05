import { Prisma } from '@prisma/client';

export const prismaResponse = (error) => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2000':
        return {
          status: 'error',
          message: 'Invalid input provided.',
          code: 400,
        };
      case 'P2001':
        return {
          status: 'error',
          message: 'The requested record was not found.',
          code: 404,
        };
      case 'P2002':
        return {
          status: 'error',
          message: 'A unique constraint failed. Please ensure the data is unique.',
          code: 409,
        };
      case 'P2010':
        return {
          status: 'error',
          message: 'Required fields are missing in the request.',
          code: 400,
        };
      case 'P2016':
        return {
          status: 'error',
          message: 'A foreign key constraint failed. Ensure related records exist.',
          code: 400,
        };
      case 'P2025':
        return {
          status: 'error',
          message: 'No record found to delete.',
          code: 404,
        };
      default:
        return {
          status: 'error',
          message: 'An unexpected error occurred. Please try again later.',
          code: 500,
        };
    }
  }

  return {
    status: 'error',
    message: 'An unexpected error occurred. Please try again later.',
    code: 500,
  };
};
