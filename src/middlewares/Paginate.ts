


// main function
async function LocalPaginate(model: any, page: number, limit: number) {
     
     const startIndex = (page - 1) * limit;

     const endIndex = page * limit;

     const response = model.slice(startIndex, endIndex);

     return {
          results: response, 
          hasMore: endIndex < model.length,
          totalFound: model.length,
          currentPage: page,
          limit: limit
     }
}



// exports
export { LocalPaginate }