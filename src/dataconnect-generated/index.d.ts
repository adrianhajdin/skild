import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateSkillData {
  skill_insert: Skill_Key;
}

export interface CreateSkillVariables {
  authorClerkId: string;
  title: string;
  description: string;
  tags: string[];
  installCommand: string;
  promptConfig: string;
  usageExample: string;
}

export interface GetSkillsData {
  skills: ({
    id: UUIDString;
    title: string;
    description: string;
    tags: string[];
    createdAt: TimestampString;
    installCommand: string;
    author: {
      username?: string | null;
      imageUrl?: string | null;
      clerkId: string;
      email: string;
    } & User_Key;
  } & Skill_Key)[];
}

export interface GetSkillsVariables {
  searchTerm?: string | null;
  limit?: number | null;
  offset?: number | null;
}

export interface Skill_Key {
  id: UUIDString;
  __typename?: 'Skill_Key';
}

export interface User_Key {
  clerkId: string;
  __typename?: 'User_Key';
}

interface CreateSkillRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateSkillVariables): MutationRef<CreateSkillData, CreateSkillVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateSkillVariables): MutationRef<CreateSkillData, CreateSkillVariables>;
  operationName: string;
}
export const createSkillRef: CreateSkillRef;

export function createSkill(vars: CreateSkillVariables): MutationPromise<CreateSkillData, CreateSkillVariables>;
export function createSkill(dc: DataConnect, vars: CreateSkillVariables): MutationPromise<CreateSkillData, CreateSkillVariables>;

interface GetSkillsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars?: GetSkillsVariables): QueryRef<GetSkillsData, GetSkillsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars?: GetSkillsVariables): QueryRef<GetSkillsData, GetSkillsVariables>;
  operationName: string;
}
export const getSkillsRef: GetSkillsRef;

export function getSkills(vars?: GetSkillsVariables, options?: ExecuteQueryOptions): QueryPromise<GetSkillsData, GetSkillsVariables>;
export function getSkills(dc: DataConnect, vars?: GetSkillsVariables, options?: ExecuteQueryOptions): QueryPromise<GetSkillsData, GetSkillsVariables>;

