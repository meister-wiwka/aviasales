class AviasalesService {
    baseURL = 'https://aviasales-test-api.kata.academy';
  
    async fetchURL(url) {
      const res = await fetch(url);
      if (!res.ok) {
        if (res.status !== 500) {
          throw new Error(`Could not fetch, received ${res.status}`);
        } else {
          throw new Error(res.status);
        }
      }
  
      return await res.json();
    }
  
    async getSearchId() {
      const url = `${this.baseURL}/search`;
  
      return await this.fetchURL(url);
    }
  
    async getTicketsPack(searchId) {
      const url = `${this.baseURL}/tickets?searchId=${searchId}`;
  
      return await this.fetchURL(url);
    }
  }
  
  const aviasalesService = new AviasalesService();
  
  export default aviasalesService;
  