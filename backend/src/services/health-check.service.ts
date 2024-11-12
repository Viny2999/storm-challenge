import { Request, Response } from 'express';
import { LoggerService } from './logger.service';
import { format, addMilliseconds } from 'date-fns';

const logger = LoggerService.getLogger();

export class HealthCheckService {

  public checkHealth = (req: Request, res: Response): Response => {
    logger.debug('HealthCheckService :: checkHealth :: Status of application retrivied');

    const secondsToMilliseconds = seconds => seconds * 1000;
    const formatToHumanDate = seconds => format(addMilliseconds(new Date(0), secondsToMilliseconds(seconds)), 'HH:mm');
    const uptimeHumanDate = formatToHumanDate(process.uptime());

    return res.send({
      apiName: 'imdb-api',
      uptime: uptimeHumanDate
    });
  };
}
