export const stringToJson = (data: string): any => {
    try {
      const jsonData = JSON.parse(data);
      return jsonData;
    } catch (error) {
      return data;
    }
  };
  