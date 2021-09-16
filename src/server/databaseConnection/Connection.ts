export default interface Connection<ConnectionType> {
  get(): ConnectionType;
  connect(): Promise<ConnectionType>;
  disconnect(): void;
}
