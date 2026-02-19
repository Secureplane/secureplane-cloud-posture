export class CronBuilder {
  buildSchedule(frequency: string): string {
    switch (frequency) {
      case 'hourly':
        return '0 * * * *';
      case 'daily':
        return '0 0 * * *';
      case 'weekly':
        return '0 0 * * 0';
      case 'monthly':
        return '0 0 1 * *';
      default:
        throw new Error(`Invalid frequency: ${frequency}`);
    }
  }
}