interface CountryNameAndImageInterface {
  countryName: string;
  countryImage: string;
}

export async function GetAllCountries() {
  const response = await fetch("https://restcountries.com/v3.1/all", {
    headers: {
      "Content-Type": "application/json",
    },
    method: "GET",
  });
  const json: [] = await response.json();
  const adaptedList: CountryNameAndImageInterface[] = json.map((item: any) => {
    const country = {
      countryName: item.name.common,
      countryImage: item.flags.svg,
    };
    return country;
  });
  return adaptedList;
}
