const tokenizeAndStem = require("./tokenizeAndStem");
const getPoints = require("./getPoints");

async function calculateMatchingAccuracy(inputIdea) {
  try {
    const ideasData = [
      {
        userId: "user101",
        title: "Virtual Event Planning Service",
        body: "Offer virtual event planning services for businesses and individuals looking to host online events and conferences.",
        genre: "Events & Entertainment",
        keywords: ["virtual events", "event planning", "online conferences"],
      },
      {
        userId: "user202",
        title: "Home Fitness Equipment Rental",
        body: "Start a rental service for home fitness equipment, providing customers with high-quality gym equipment on a subscription basis.",
        genre: "Fitness & Wellness",
        keywords: ["fitness equipment", "home gym", "rental service"],
      },
      {
        userId: "user303",
        title: "Personalized Learning Platform for Kids",
        body: "Develop a personalized learning platform for children, offering educational content tailored to their individual needs and interests.",
        genre: "Education & Learning",
        keywords: ["personalized learning", "educational platform", "children"],
      },
      {
        userId: "user123",
        title: "Local Food Delivery Service",
        body: "Start a local food delivery service focusing on delivering homemade meals from local cooks to customers.",
        genre: "Food & Beverage",
        keywords: ["food delivery", "local", "homemade"],
      },
    ];
    
    // Tokenize and stem the input idea
    inputIdea = await tokenizeAndStem(inputIdea);

    let allIdeas = ideasData.map(async (idea) => {
      // Tokenize and stem each idea
      return await tokenizeAndStem(idea);
    });

    // Wait for all idea tokens to be generated
    allIdeas = await Promise.all(allIdeas);

    // Initialize a map to store ideas and their points
    const ideaPointsMap = new Map();

    // Calculate points for each idea matching inputIdea
    for (const oneIdea of allIdeas) {
      const points = await getPoints(inputIdea, oneIdea); // Use getPoints function
      ideaPointsMap.set(oneIdea, points);
    }

    // Convert map to array and sort it based on points
    const sortedIdeas = [...ideaPointsMap.entries()].sort(
      (a, b) => b[1] - a[1]
    );
    return sortedIdeas;
  } catch (err) {
    console.error(err);
    throw new Error("Error calculating matching accuracy");
  }
}

module.exports = calculateMatchingAccuracy;