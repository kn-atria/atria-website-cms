import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

// Shared options used by both workspaces
const sharedConfig = {
  projectId: 'st0v8u3d',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
}

// Two workspaces: Development (default) and Production
// Switch between them using the workspace switcher in Studio (top-left dropdown)
export default defineConfig([
  {
    ...sharedConfig,
    name: 'development',
    title: 'Atria Renewable (Dev)',
    dataset: 'development',
    basePath: '/dev',
  },
  {
    ...sharedConfig,
    name: 'production',
    title: 'Atria Renewable (Prod)',
    dataset: 'production',
    basePath: '/prod',
  },
])
