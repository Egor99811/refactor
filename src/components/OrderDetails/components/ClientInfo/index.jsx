import { Text, Paper, Stack } from "@mantine/core";

export function ClientInfo({ user }) {
  return (
    <div>
      <Text fw={500} mb="sm">
        Информация о клиенте
      </Text>
      <Paper p="md" bg="gray.0">
        <Stack gap="xs">
          <Text fw={500}>{user?.name}</Text>
          <Text size="sm" c="dimmed">
            {user?.email}
          </Text>
          <Text size="sm" c="dimmed">
            {user?.phone}
          </Text>
        </Stack>
      </Paper>
    </div>
  );
}
