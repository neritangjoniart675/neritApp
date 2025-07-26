import { cloneDeep } from 'lodash';

const version = 60;
const SUPPORT_NOTIFICATION_KEY = 2;
const SUPPORT_NOTIFICATION_DATE = '2020-08-31';

export default {
  version,
  async migrate(originalVersionedData) {
    const versionedData = cloneDeep(originalVersionedData);
    versionedData.meta.version = version;
    const state = { ...versionedData.data };
    
    if (state.NotificationController?.notifications?.[SUPPORT_NOTIFICATION_KEY]?.date === SUPPORT_NOTIFICATION_DATE) {
      delete state.NotificationController.notifications[SUPPORT_NOTIFICATION_KEY];
    }
    
    versionedData.data = state;
    return versionedData;
  },
};
