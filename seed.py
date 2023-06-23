from app import db
from app.models import Category, Idea

def seed_data():
    # Create categories
    cooking_category = Category(name="Cooking", description="Ideas related to cooking and culinary arts")
    home_improvement_category = Category(name="Home Improvement", description="Ideas related to home improvement and renovations")
    art_category = Category(name="Art", description="Ideas related to various art forms and creative endeavors")
    business_category = Category(name="Business", description="Ideas related to entrepreneurship and business ventures")
    technology_category = Category(name="Technology", description="Ideas related to technology and innovation")

    # Cooking ideas
    cooking_ideas = [
        Idea(title="Create a fusion cuisine dish combining Asian and Mediterranean flavors.",
            description="Experiment with ingredients and techniques from both cuisines to create a unique and flavorful fusion dish.",
            category=cooking_category),
        Idea(title="Develop a series of healthy and quick 15-minute recipes for busy individuals.",
            description="Design a collection of recipes that are nutritious, easy to prepare, and perfect for individuals with busy schedules.",
            category=cooking_category),
        Idea(title="Organize a virtual cooking class to teach people how to make homemade pasta.",
            description="Host an online cooking class where participants can learn the art of making fresh pasta from scratch.",
            category=cooking_category),
        Idea(title="Create a cookbook specifically catering to vegan desserts.",
            description="Compile a variety of delicious vegan dessert recipes in a beautifully illustrated cookbook, providing options for those with dietary restrictions.",
            category=cooking_category),
        Idea(title="Start a food blog featuring unique and lesser-known international cuisines.",
            description="Share your culinary adventures and discoveries from various cuisines around the world, introducing readers to new flavors and cultural experiences.",
            category=cooking_category)
    ]

    # Home Improvement ideas
    home_improvement_ideas = [
        Idea(title="Design and build a functional home office space in a small apartment.",
            description="Explore creative solutions to optimize limited space and create a productive and stylish home office within a small apartment.",
            category=home_improvement_category),
        Idea(title="Renovate a bathroom to incorporate eco-friendly and sustainable design elements.",
            description="Redesign a bathroom using environmentally friendly materials, energy-efficient fixtures, and water-saving technologies.",
            category=home_improvement_category),
        Idea(title="Create an outdoor entertainment area with a cozy fire pit and seating.",
            description="Transform an outdoor space into a welcoming and comfortable area for gatherings by installing a fire pit and arranging seating options.",
            category=home_improvement_category),
        Idea(title="Install a smart home automation system to control lighting and temperature.",
            description="Upgrade your home with smart technology that allows for convenient control of lighting and temperature through voice commands or mobile apps.",
            category=home_improvement_category),
        Idea(title="Build a vertical garden or living wall for a vibrant and space-efficient greenery display.",
            description="Construct a vertical garden using wall-mounted planters or hanging containers to bring the beauty of plants into smaller spaces.",
            category=home_improvement_category)
    ]

    # Art ideas
    art_ideas = [
        Idea(title="Paint a large-scale mural depicting the history and culture of the local community.",
            description="Create a visually captivating mural that tells the story of the community, celebrating its heritage and diversity.",
            category=art_category),
        Idea(title="Sculpt a public art installation using recycled materials to raise awareness about environmental sustainability.",
            description="Craft a striking sculpture using repurposed materials, aiming to inspire conversations about recycling and sustainable practices.",
            category=art_category),
        Idea(title="Organize a collaborative art project that involves local artists and community members.",
            description="Facilitate a project where artists and community members work together to create a collaborative art piece, fostering unity and creativity.",
            category=art_category),
        Idea(title="Experiment with abstract painting techniques using unconventional materials.",
            description="Explore innovative ways to create abstract art by using non-traditional tools and materials to achieve unique textures and effects.",
            category=art_category),
        Idea(title="Create a series of digital illustrations inspired by science fiction and futuristic themes.",
            description="Produce a collection of digital artworks that depict imaginative and futuristic scenes, blending science fiction elements with your artistic style.",
            category=art_category)
    ]

    # Business ideas
    business_ideas = [
        Idea(title="Develop a mobile app that connects local farmers with consumers for direct produce purchases.",
            description="Build a platform that allows farmers to showcase and sell their products directly to consumers, promoting local and sustainable agriculture.",
            category=business_category),
        Idea(title="Launch an online marketplace for handmade crafts and artisanal products.",
            description="Create an e-commerce platform where independent artisans can sell their unique handmade goods, supporting small businesses and fostering creativity.",
            category=business_category),
        Idea(title="Start a personalized gift service that curates and delivers thoughtful gift packages for special occasions.",
            description="Offer a service that curates and delivers customized gift packages, providing unique and meaningful presents for various occasions.",
            category=business_category),
        Idea(title="Create an online course platform for teaching business skills and entrepreneurship.",
            description="Build a platform that offers a wide range of online courses and resources to help aspiring entrepreneurs develop business skills.",
            category=business_category),
        Idea(title="Start a subscription box service for entrepreneurs, providing curated resources and tools.",
            description="Launch a subscription-based service that delivers a monthly box of valuable resources, books, and tools to support and inspire entrepreneurs.",
            category=business_category)
    ]

    # Technology ideas
    technology_ideas = [
        Idea(title="Develop a mobile app for language learning with interactive exercises and quizzes.",
            description="Create a language learning app that engages users with interactive exercises, quizzes, and personalized learning paths.",
            category=technology_category),
        Idea(title="Build a smart home security system with integrated surveillance cameras and motion sensors.",
            description="Design and implement a comprehensive smart home security system that provides real-time monitoring and alerts.",
            category=technology_category),
        Idea(title="Create a virtual reality (VR) experience for exploring historical landmarks and locations.",
            description="Develop a VR application that allows users to virtually visit and explore famous historical landmarks and locations around the world.",
            category=technology_category),
        Idea(title="Build an AI-powered chatbot for customer support and assistance.",
            description="Create a chatbot using AI and natural language processing techniques to provide automated customer support and assistance.",
            category=technology_category),
        Idea(title="Design and develop a mobile app for managing personal finances and budgeting.",
            description="Build a user-friendly mobile app that helps individuals track expenses, manage budgets, and gain financial insights.",
            category=technology_category)
    ]

    # Add the objects to the session and commit to the database
    db.session.add_all([
        cooking_category, home_improvement_category, art_category, business_category, technology_category,
        *cooking_ideas, *home_improvement_ideas, *art_ideas, *business_ideas, *technology_ideas
    ])
    db.session.commit()

# Call the seed_data() function to populate the database with seed data
seed_data()
