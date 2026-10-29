import { schemas, validate, resolveInsideProject, verifyProjectBaselines } from '@chore-design/contracts';

const result = validate('project', {});
if (result.success) console.log(result.data);
schemas.project.safeParse({});
void resolveInsideProject('/project', 'component.tsx');
verifyProjectBaselines({}, []);
// @ts-expect-error Invalid contract names must not type-check.
validate('not-a-contract', {});
