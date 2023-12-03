interface ResourceRepository {
  async search(query: string): Promise<any[]>
}