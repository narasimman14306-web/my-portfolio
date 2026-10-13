import { db } from './database';

/**
 * Migration runner and schema version check
 */
export async function checkAndRunMigrations() {
  try {
    if (!db.isOpen()) {
      await db.open();
    }
    // Record schema version in settings table
    const currentVersion = db.verno;
    const versionRecord = await db.settings.get('db_version');

    if (!versionRecord) {
      await db.settings.put({
        key: 'db_version',
        value: currentVersion,
        updatedAt: new Date().toISOString()
      });
    }

    return {
      success: true,
      currentVersion
    };
  } catch (error) {
    console.error('Database migration/init error:', error);
    return {
      success: false,
      error
    };
  }
}
