import axios from "axios";
class PlantServise {
  GetAllData = async () => {

    const options = {
      method: 'GET',
      url: 'https://house-plants2.p.rapidapi.com/all',
      headers: {
        'X-RapidAPI-Key': '8de64391bemsh543959290092641p16d132jsn6083d1a84e69',
        'X-RapidAPI-Host': 'house-plants2.p.rapidapi.com'
      }
    };
    const response = await axios.request(options);
    if (response) {
      const allData = response.data
      return allData
    }
  }
  GetAllCategories = async () => {
    const onlyCategoriesNames: any[] = [];

    const options = {
      method: 'GET',
      url: 'https://house-plants2.p.rapidapi.com/categories',
      headers: {
        'X-RapidAPI-Key': '8de64391bemsh543959290092641p16d132jsn6083d1a84e69',
        'X-RapidAPI-Host': 'house-plants2.p.rapidapi.com'
      }
    };
    const response = await axios.request(options);
    if (response) {
      const categories = response.data
      console.log("from Servise", categories);
      categories.map((e: any) => {
        onlyCategoriesNames.push(e['Category'])


      })
      console.log("from Sevise only names", onlyCategoriesNames);
      return onlyCategoriesNames
    }
  }

  GetById = async (plantId: any) => {
    const options = {
      method: 'GET',
      url: `https://house-plants2.p.rapidapi.com/id/${plantId}`,
      headers: {
        'X-RapidAPI-Key': '8de64391bemsh543959290092641p16d132jsn6083d1a84e69',
        'X-RapidAPI-Host': 'house-plants2.p.rapidapi.com'
      }
    };
    const response = await axios.request(options);
    return response;
  }

}
const plantServise = new PlantServise();
export default plantServise;