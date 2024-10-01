const formatDate = (timestamp: string) => {
    const date = new Date(Number(timestamp));

// Format the date into a human-readable string
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

    return formattedDate
  }

  export {
    formatDate
  }