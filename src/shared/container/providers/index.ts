import { container } from 'tsyringe';

import { DateProvider } from './DateProvider/DateProvider';
import { DayJsDateProvider } from './DateProvider/implementations/DayJsDateProvider';

container.registerSingleton<DateProvider>('DateProvider', DayJsDateProvider);
