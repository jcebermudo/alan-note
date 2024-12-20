// This file was generated by prisma-field-encryption.

import type { PrismaClient } from '@prisma/client'
import { migrate as migrateNote } from './Note'

export interface ProgressReport {
  model: string
  processed: number
  totalCount: number
  performance: number
}

export type ProgressReportCallback = (
  progress: ProgressReport
) => void | Promise<void>

export const defaultProgressReport: ProgressReportCallback = ({
  model,
  totalCount,
  processed,
  performance
}) => {
  const length = totalCount.toString().length
  const pct = Math.round((100 * processed) / totalCount)
    .toString()
    .padStart(3)
  console.info(
    `${model.padEnd(4)} ${pct}% processed ${processed
      .toString()
      .padStart(length)} / ${totalCount} (took ${performance.toFixed(2)}ms)`
  )
}

// --

export type MigrationReport = {
  Note: number
}

/**
 * Migrate models concurrently.
 *
 * Processed models:
 * - Note
 *
 * @returns a dictionary of the number of processed records per model.
 */
export async function migrate(
  client: PrismaClient,
  reportProgress: ProgressReportCallback = defaultProgressReport
): Promise<MigrationReport> {
  const [
    processedNote
  ] = await Promise.all([
    migrateNote(client, reportProgress)
  ])
  return {
    Note: processedNote
  }
}
