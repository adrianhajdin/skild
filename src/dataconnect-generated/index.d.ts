import type {
	ConnectorConfig,
	DataConnect,
	DataConnectSettings,
	ExecuteQueryOptions,
	QueryPromise,
	QueryRef,
} from "firebase/data-connect";

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;

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
}

export interface Skill_Key {
	id: UUIDString;
	__typename?: "Skill_Key";
}

export interface User_Key {
	clerkId: string;
	__typename?: "User_Key";
}

interface GetSkillsRef {
	/* Allow users to create refs without passing in DataConnect */
	(vars?: GetSkillsVariables): QueryRef<GetSkillsData, GetSkillsVariables>;
	/* Allow users to pass in custom DataConnect instances */
	(
		dc: DataConnect,
		vars?: GetSkillsVariables,
	): QueryRef<GetSkillsData, GetSkillsVariables>;
	operationName: string;
}
export const getSkillsRef: GetSkillsRef;

export function getSkills(
	vars?: GetSkillsVariables,
	options?: ExecuteQueryOptions,
): QueryPromise<GetSkillsData, GetSkillsVariables>;
export function getSkills(
	dc: DataConnect,
	vars?: GetSkillsVariables,
	options?: ExecuteQueryOptions,
): QueryPromise<GetSkillsData, GetSkillsVariables>;
