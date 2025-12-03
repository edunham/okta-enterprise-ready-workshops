
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import {
  IListResponse, IOktaRole, IResourceType, SCHEMA_LIST_RESPONSE, SCHEMA_OKTA_ROLE, SCHEMA_RESOURCE_TYPE
} from './scim-types';

const prisma = new PrismaClient();
export const rolesRoute = Router();
export const resourceTypesRoute = Router();

rolesRoute.route('/')
.get(async (req, res) => {
  const startIndex = parseInt(req.query.startIndex as string ?? '1');
  const recordLimit = parseInt(req.query.recordLimit as string ?? '100');

  const roles = await prisma.role.findMany({
    take: recordLimit,
    skip: startIndex - 1
  });

  const listResponse: IListResponse<IOktaRole> = {
    schemas: [SCHEMA_LIST_RESPONSE],
    totalResults: roles.length,
    startIndex,
    itemsPerPage: recordLimit,
    Resources: roles.map(role => ({
      schemas: [SCHEMA_OKTA_ROLE],
      id: role.id.toString(),
      displayName: role.name
    }))
  };

  return res.json(listResponse);
});