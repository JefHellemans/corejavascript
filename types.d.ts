interface Todo {
    id?: string;
    description: string;
    completed: boolean;
    assignee?: string;
    due: Date | null;
    reminder?: boolean;
}
