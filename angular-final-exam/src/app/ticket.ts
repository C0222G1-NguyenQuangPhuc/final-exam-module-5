export interface Ticket {
  ticketId?: number;
  destination?: string;
  arrive?: string;
  dayStart?: string;
  timeStart?: string;
  bus?: {
    busId?: number;
    busName?: string;
  };
  price?: number;
  quantity?: number;
}
