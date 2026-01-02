import { useState, useMemo } from 'react';
import '@mantine/core/styles.css';
import { 
  MantineProvider, Container, Table, Accordion, Text, Anchor, 
  Button, Title, ActionIcon, Group, Tooltip, TextInput, Stack, Box 
} from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { IconCopy, IconCheck, IconSearch, IconX } from '@tabler/icons-react';

const db = {
  "Test": [
    { "name": "Test API 2", "url": "https://test-api1.example.com", "comment": "" },
    { "name": "Test Website", "url": "https://test.example.com", "comment": "Frontend testing environment" }
  ],
  "UAT": [
    { "name": "UAT API", "url": "https://uat-api.example.com", "comment": "Staging environment" }
  ],
  "Production": [
    { "name": "Production API", "url": "https://api.example.com", "comment": "Live production API" }
  ]
};

// Sub-component to ensure each row has its own independent "copied" state
function UrlRow({ item }: { item: { name: string, url: string, comment: string } }) {
  const clipboard = useClipboard({ timeout: 2000 });

  return (
    <Table.Tr>
      <Table.Td fw={500}>{item.name}</Table.Td>
      <Table.Td>
        <Group gap="xs" wrap="nowrap">
          <Anchor href={item.url} target="_blank" size="sm" style={{ wordBreak: 'break-all' }}>
            {item.url}
          </Anchor>
          <Tooltip label={clipboard.copied ? "Copied" : "Copy URL"}>
            <ActionIcon 
              variant="subtle" 
              color={clipboard.copied ? 'teal' : 'gray'} 
              onClick={() => clipboard.copy(item.url)}
            >
              {clipboard.copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
            </ActionIcon>
          </Tooltip>
        </Group>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c="dimmed">{item.comment}</Text>
      </Table.Td>
      <Table.Td>
        <Button 
          component="a" 
          href={item.url} 
          target="_blank" 
          size="compact-xs" 
          variant="filled"
          color="blue"
        >
          Open
        </Button>
      </Table.Td>
    </Table.Tr>
  );
}

export default function App() {
  const [search, setSearch] = useState('');

  const filteredData = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return db;

    return Object.entries(db).reduce((acc, [env, items]) => {
      const filteredItems = items.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.url.toLowerCase().includes(query) ||
        item.comment.toLowerCase().includes(query)
      );
      if (filteredItems.length > 0) acc[env] = filteredItems;
      return acc;
    }, {} as typeof db);
  }, [search]);

  // All environment names for the default open state of the Accordion
  const envKeys = Object.keys(db);

  return (
    <MantineProvider defaultColorScheme="dark">
      <Container size="md" py="xl">
        <Stack gap="xl">
          <Title order={2} ta="center">urler</Title>

          <TextInput
            placeholder="Search by name, URL, or comment..."
            leftSection={<IconSearch size={16} />}
            size="md"
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            rightSection={search && (
              <ActionIcon variant="transparent" color="gray" onClick={() => setSearch('')}>
                <IconX size={14} />
              </ActionIcon>
            )}
          />

          {Object.keys(filteredData).length > 0 ? (
            <Accordion multiple defaultValue={envKeys}>
              {Object.entries(filteredData).map(([envName, items]) => (
                <Accordion.Item key={envName} value={envName}>
                  <Accordion.Control>
                    <Group justify="space-between" pr="md">
                      <Text fw={700} size="lg">{envName}</Text>
                      <Text size="xs" c="dimmed">{items.length} items</Text>
                    </Group>
                  </Accordion.Control>
                  
                  <Accordion.Panel>
                    <Table striped highlightOnHover verticalSpacing="sm">
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th>Name</Table.Th>
                          <Table.Th>URL</Table.Th>
                          <Table.Th>Comment</Table.Th>
                          <Table.Th>Action</Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>
                        {items.map((item, index) => (
                          <UrlRow key={`${envName}-${index}`} item={item} />
                        ))}
                      </Table.Tbody>
                    </Table>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
            </Accordion>
          ) : (
            <Box ta="center" py="xl">
              <Text c="dimmed">No links match your search query.</Text>
            </Box>
          )}
        </Stack>
      </Container>
    </MantineProvider>
  );
}
