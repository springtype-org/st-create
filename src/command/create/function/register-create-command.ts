import { Command } from 'commander';
import { createProject } from '../subcommand/project/function/create-project';

export default function registerCreateCommand(program: Command) {
  program.description('Generates components and projects from templates').action(async (opts: any) => {
    const { template } = opts;
    let { descriptor } = opts;

    if (typeof descriptor !== 'string') descriptor = undefined;

    const projectPath = process.cwd();

    await createProject(projectPath, template, descriptor);
  });
}
