export interface RespondsContextValue {
  responds: string[];
  loading: boolean;
  respond: (klychId: string) => Promise<void>;
}
