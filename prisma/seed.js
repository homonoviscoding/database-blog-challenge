const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


async function seed() {

    const usersToCreate = [
        {
            username: 'Alice',
            email: 'alice@smth.com',
            profile: {
                create: {
                    picture: 'picture.uk.com',
                    biography: 'type s**t I`m on!',
                    githubUrl: 'mygithuburl.co.uk'
                }
            }
        },
        {
            username: 'Robert',
            email: 'bob@smth.com',
            profile: {
                create: {
                    picture: 'picture.uk.com',
                    biography: 'type s**t I`m on!',
                    githubUrl: 'mygithuburl.co.uk'
                }
            }
        },
        {
            username: 'will',
            email: 'will@smth.com',
            profile: {
                create: {
                    picture: 'picture.uk.com',
                    biography: 'type s**t I`m on!',
                    githubUrl: 'mygithuburl.co.uk'
                }
            }
        }
    ]

    const createdUsers = []

    for (const user of usersToCreate) {
        const createdUser = await prisma.user.create({
            data: user,
            include: {
                profile: true
            }
        })
        createdUsers.push(createdUser)
        console.log(createdUser)
    }

    console.log(`${createdUsers.count} users created`, createdUsers);

    // Add your code here

    const CreatedPosts = []
    for (const createdUser of createdUsers) {
        const post = await prisma.post.createMany({
            data: [
                {
                    title: 'Instructions',
                    content: 'Create the Post model and add the minimum fields listed above, Add any other fields you identified while completing the ERD.',
                    picture: 'mypicture.co.uk',
                    isPublished: true,
                    userId: createdUser.id 
                }
            ]

        })
        CreatedPosts.push(post)
    }
    


    // Don't edit any of the code below this line
    process.exit(0);
}

seed()
    .catch(async (error) => {
        console.error(error);
        await prisma.$disconnect();
        process.exit(1);
    })