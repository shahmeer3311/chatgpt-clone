import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";

export const ChatStore = create(
  persist(
    (set, get) => ({
      chats: [],
      activeChatId: null,

      createNewChat: () => {
        const newChat = {
          id: nanoid(),
          createdAt: Date.now(),
          messages: [],
        };
        set((state) => ({
          chats: [...state.chats, newChat],
          activeChatId: newChat.id,
        }));
      },

      setActiveChat: (chatId) => set({ activeChatId: chatId }),

      addMessage: (msg) => {
        const { activeChatId } = get();
        if (!activeChatId) return;

        set((state) => ({
          chats: state.chats.map((c) =>
            c.id === activeChatId
              ? { ...c, messages: [...c.messages, msg] }
              : c
          ),
        }));
      },

      getActiveMessages: () => {
        const { chats, activeChatId } = get();
        const chat = chats.find((c) => c.id === activeChatId);
        return chat ? chat.messages : [];
      },

      deleteChat: (id) =>
        set((state) => ({
          chats: state.chats.filter((c) => c.id !== id),
          activeChatId: state.activeChatId === id ? null : state.activeChatId,
        })),
    }),
    {
      name: "multi-chat-storage-v2", // 🔥 NEW KEY
    }
  )
);