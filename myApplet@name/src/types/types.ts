export type Metadata = {
  uuid: string
  name: string
  description: string
  "max-instances"?: number
  version?: string
  multiversion?: boolean
  "cinnamon-version"?: string[]
  state?: number
  path: string
  error?: string
  force_loaded: boolean
}

// representation of setting keys defined in settings-schema.json.
export type AppletSettingsProps = {
  appletLabel: string
}
