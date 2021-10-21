import prismaClient from "../prisma";

class GetLast3MessagesService {
  async execute() {
    //seleciona, dentre as mensagens, as 3 mais recentes
    const messages = await prismaClient.message.findMany({
      take: 3,
      orderBy: {
        created_at: "desc",
      },
      include: {
        user: true,
      },
    });

    return messages;
  }
}

export { GetLast3MessagesService };
