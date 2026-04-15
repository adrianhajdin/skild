import { CreateSkillData, CreateSkillVariables, GetSkillsData, GetSkillsVariables, GetSkillByIdData, GetSkillByIdVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateSkill(options?: useDataConnectMutationOptions<CreateSkillData, FirebaseError, CreateSkillVariables>): UseDataConnectMutationResult<CreateSkillData, CreateSkillVariables>;
export function useCreateSkill(dc: DataConnect, options?: useDataConnectMutationOptions<CreateSkillData, FirebaseError, CreateSkillVariables>): UseDataConnectMutationResult<CreateSkillData, CreateSkillVariables>;

export function useGetSkills(vars?: GetSkillsVariables, options?: useDataConnectQueryOptions<GetSkillsData>): UseDataConnectQueryResult<GetSkillsData, GetSkillsVariables>;
export function useGetSkills(dc: DataConnect, vars?: GetSkillsVariables, options?: useDataConnectQueryOptions<GetSkillsData>): UseDataConnectQueryResult<GetSkillsData, GetSkillsVariables>;

export function useGetSkillById(vars: GetSkillByIdVariables, options?: useDataConnectQueryOptions<GetSkillByIdData>): UseDataConnectQueryResult<GetSkillByIdData, GetSkillByIdVariables>;
export function useGetSkillById(dc: DataConnect, vars: GetSkillByIdVariables, options?: useDataConnectQueryOptions<GetSkillByIdData>): UseDataConnectQueryResult<GetSkillByIdData, GetSkillByIdVariables>;
