from faker import Faker
from app import app, db
from models import Category, Prompt, User

fake = Faker()

def create_seed_data():
    Category.query.delete()
    Prompt.query.delete()
    User.query.delete()
    if db.session.query(Category.query.exists()).scalar():
        print("Seed data already exists. Skipping creation.")
        return
    # Generate users
    users = []
    for _ in range(10):
        username = fake.user_name()
        email = fake.email()
        password = fake.password()
        first_name = fake.first_name()
        last_name = fake.last_name()
        bio = fake.text(max_nb_chars=200)
        user = User(username=username, email=email, password=password, first_name=first_name, last_name=last_name, bio=bio)
        users.append(user)

    db.session.add_all(users)
    db.session.commit()

    # Create categories
    cooking_category = Category(name="Cooking", description="Ideas related to cooking and culinary arts")
    home_improvement_category = Category(name="Home Improvement", description="Ideas related to home improvement and renovations")
    art_category = Category(name="Art", description="Ideas related to various art forms and creative endeavors")
    business_category = Category(name="Business", description="Ideas related to entrepreneurship and business ventures")
    technology_category = Category(name="Technology", description="Ideas related to technology and innovation")

    db.session.add_all([cooking_category, home_improvement_category, art_category, business_category, technology_category])
    db.session.commit()

    # Cooking ideas
    cooking_ideas = [
        Prompt(user_id=1, category_id=cooking_category.id, title="Create a fusion cuisine dish combining Asian and Mediterranean flavors.",
            description="Experiment with ingredients and techniques from both cuisines to create a unique and flavorful fusion dish."),
        Prompt(user_id=2, category_id=cooking_category.id, title="Develop a series of healthy and quick 15-minute recipes for busy individuals.",
            description="Design a collection of recipes that are nutritious, easy to prepare, and perfect for individuals with busy schedules."),
        Prompt(user_id=3, category_id=cooking_category.id, title="Organize a virtual cooking class to teach people how to make homemade pasta.",
            description="Host an online cooking class where participants can learn the art of making fresh pasta from scratch."),
        Prompt(user_id=4, category_id=cooking_category.id, title="Create a cookbook specifically catering to vegan desserts.",
            description="Compile a variety of delicious vegan dessert recipes in a beautifully illustrated cookbook, providing options for those with dietary restrictions."),
        Prompt(user_id=5, category_id=cooking_category.id, title="Start a food blog featuring unique and lesser-known international cuisines.",
            description="Share your culinary adventures and discoveries from various cuisines around the world, introducing readers to new flavors and cultural experiences.")
    ]

    db.session.add_all(cooking_ideas)
    db.session.commit()

    # Home Improvement ideas
    home_improvement_ideas = [
        Prompt(user_id=6, category_id=home_improvement_category.id, title="Design and build a functional home office space in a small apartment.",
            description="Explore creative solutions to optimize limited space and create a productive and stylish home office within a small apartment."),
        Prompt(user_id=7, category_id=home_improvement_category.id, title="Renovate a bathroom to incorporate eco-friendly and sustainable design elements.",
            description="Redesign a bathroom using environmentally friendly materials, energy-efficient fixtures, and water-saving technologies."),
        Prompt(user_id=8, category_id=home_improvement_category.id, title="Create an outdoor entertainment area with a cozy fire pit and seating.",
            description="Transform an outdoor space into a welcoming and comfortable area for gatherings by installing a fire pit and arranging seating options."),
        Prompt(user_id=9, category_id=home_improvement_category.id, title="Install a smart home automation system to control lighting and temperature.",
            description="Upgrade your home with smart technology that allows for convenient control of lighting and temperature through voice commands or mobile apps."),
        Prompt(user_id=10, category_id=home_improvement_category.id, title="Build a vertical garden or living wall for a vibrant and space-efficient greenery display.",
            description="Construct a vertical garden using wall-mounted planters or hanging containers to bring the beauty of plants into smaller spaces.")
    ]

    db.session.add_all(home_improvement_ideas)
    db.session.commit()

    # Art ideas
    art_ideas = [
        Prompt(user_id=11, category_id=art_category.id, title="Paint a large-scale mural depicting the history and culture of the local community.",
            description="Create a visually captivating mural that tells the story of the community, celebrating its heritage and diversity."),
        Prompt(user_id=12, category_id=art_category.id, title="Sculpt a public art installation using recycled materials to raise awareness about environmental sustainability.",
            description="Craft a striking sculpture using repurposed materials, aiming to inspire conversations about recycling and sustainable practices."),
        Prompt(user_id=13, category_id=art_category.id, title="Organize a collaborative art project that involves local artists and community members.",
            description="Facilitate a project where artists and community members work together to create a collaborative art piece, fostering unity and creativity."),
        Prompt(user_id=14, category_id=art_category.id, title="Experiment with abstract painting techniques using unconventional materials.",
            description="Explore innovative ways to create abstract art by using non-traditional tools and materials to achieve unique textures and effects."),
        Prompt(user_id=15, category_id=art_category.id, title="Create a series of digital illustrations inspired by science fiction and futuristic themes.",
            description="Produce a collection of digital artworks that depict imaginative and futuristic scenes, blending science fiction elements with your artistic style.")
    ]

    db.session.add_all(art_ideas)
    db.session.commit()

    # Business ideas
    business_ideas = [
        Prompt(user_id=16, category_id=business_category.id, title="Develop a mobile app that connects local farmers with consumers for direct produce purchases.",
            description="Build a platform that allows farmers to showcase and sell their products directly to consumers, promoting local and sustainable agriculture."),
        Prompt(user_id=17, category_id=business_category.id, title="Launch an online marketplace for handmade crafts and artisanal products.",
            description="Create an e-commerce platform where independent artisans can sell their unique handmade goods, supporting small businesses and fostering creativity."),
        Prompt(user_id=18, category_id=business_category.id, title="Start a personalized gift service that curates and delivers thoughtful gift packages for special occasions.",
            description="Offer a service that curates and delivers customized gift packages, providing unique and meaningful presents for various occasions."),
        Prompt(user_id=19, category_id=business_category.id, title="Create an online course platform for teaching business skills and entrepreneurship.",
            description="Build a platform that offers a wide range of online courses and resources to help aspiring entrepreneurs develop business skills."),
        Prompt(user_id=20, category_id=business_category.id, title="Start a subscription box service for entrepreneurs, providing curated resources and tools.",
            description="Launch a subscription-based service that delivers a monthly box of valuable resources, books, and tools to support and inspire entrepreneurs.")
    ]

    db.session.add_all(business_ideas)
    db.session.commit()

    # Technology ideas
    technology_ideas = [
        Prompt(user_id=21, category_id=technology_category.id, title="Develop a mobile app for language learning with interactive exercises and quizzes.",
            description="Create a language learning app that engages users with interactive exercises, quizzes, and personalized learning paths."),
        Prompt(user_id=22, category_id=technology_category.id, title="Build a smart home security system with integrated surveillance cameras and motion sensors.",
            description="Design and implement a comprehensive smart home security system that provides real-time monitoring and alerts."),
        Prompt(user_id=23, category_id=technology_category.id, title="Create a virtual reality (VR) experience for exploring historical landmarks and locations.",
            description="Develop a VR application that allows users to virtually visit and explore famous historical landmarks and locations around the world."),
        Prompt(user_id=24, category_id=technology_category.id, title="Build an AI-powered chatbot for customer support and assistance.",
            description="Create a chatbot using AI and natural language processing techniques to provide automated customer support and assistance."),
        Prompt(user_id=25, category_id=technology_category.id, title="Design and develop a mobile app for managing personal finances and budgeting.",
            description="Build a user-friendly mobile app that helps individuals track expenses, manage budgets, and gain financial insights.")
    ]

    db.session.add_all(technology_ideas)
    db.session.commit()

# Call the create_seed_data() function to populate the database with seed data
if __name__ == '__main__':
    with app.app_context():
        create_seed_data()
