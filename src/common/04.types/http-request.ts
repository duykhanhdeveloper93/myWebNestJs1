import { IncomingHttpHeaders } from 'http';

export type CIncomingHttpHeaders = IncomingHttpHeaders & {
    'u-s': string,
    'u-s-r': string,
    'client-id': string,
}