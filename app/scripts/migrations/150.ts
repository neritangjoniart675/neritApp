export async function migrate(originalVersionedData: VersionedData): Promise<VersionedData> {
  const { meta, data } = cloneDeep(originalVersionedData);
  meta.version = version;
  transformState(data);
  return { meta, data };
}

function transformState(state: Record<string, unknown>) {
  if (state?.PreferencesController?.preferences) {
    delete state.PreferencesController.preferences.petnamesEnabled;
  }
}
