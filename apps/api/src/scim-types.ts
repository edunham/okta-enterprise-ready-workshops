

export interface IScimResource {
  id: string;
  schemas: string[];
  meta?: IMetadata;
}

export interface IMetadata {
  resourceType: RESOURCE_TYPES;
  location?: string;
}

export interface IOktaRole extends IScimResource{
  displayName: string;
}

export interface IResourceType {
  id?: string;
  schemas: string[];
  name: string; 
  description?: string;
  endpoint: string;
  schema: string; 
  meta: IMetadata;
}

export interface IListResponse<T extends IScimResource | IResourceType> {
  schemas: string[];
  totalResults: number;
  startIndex: number;
  itemsPerPage: number;
  Resources: T[];
}

export const SCHEMA_OKTA_ROLE = 'urn:okta:scim:schemas:core:1.0:Role';
export const SCHEMA_LIST_RESPONSE = 'urn:ietf:params:scim:api:messages:2.0:ListResponse';
export const SCHEMA_RESOURCE_TYPE = 'urn:ietf:params:scim:schemas:core:2.0:ResourceType';
export type RESOURCE_TYPES = 'Role' | 'ResourceType';