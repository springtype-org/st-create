import { Command } from 'commander';
import { createProject } from '../subcommand/project/function/create-project';

export default function registerCreateCommand(program: Command) {
  program.description('Generates projects from templates').action(async (opts: any) => {
    const { template } = opts;
    let { name } = opts;

    if (typeof name !== 'string') name = undefined;

    const projectPath = process.cwd();

    await createProject(projectPath, template, name);
  });
}
