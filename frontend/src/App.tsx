import { useState, useMemo } from 'react';
import '@mantine/core/styles.css';
import { 
  MantineProvider, Container, Table, Accordion, Text, Anchor, 
  Button, Title, ActionIcon, Group, Tooltip, TextInput, Stack, Box 
} from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { IconCopy, IconCheck, IconSearch, IconX } from '@tabler/icons-react';
import db from './db.json';

function UrlRow({ item }: { item: { name: string, url: string, comment: string } }) {
  const clipboard = useClipboard({ timeout: 2000 });

  return (
    <Table.Tr>
      <Table.Td fw={500} style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
        {item.name}
      </Table.Td>
      <Table.Td>
        <Group gap="xs" wrap="nowrap">
          <Anchor 
            href={item.url} 
            target="_blank" 
            size="sm" 
            style={{ 
              display: 'block',
              overflow: 'hidden', 
              textOverflow: 'ellipsis', 
              whiteSpace: 'nowrap',
              maxWidth: '100%' 
            }}
          >
            {item.url}
          </Anchor>
          <Tooltip label={clipboard.copied ? "Copied" : "Copy URL"}>
            <ActionIcon 
              variant="subtle" 
              color={clipboard.copied ? 'teal' : 'gray'} 
              onClick={() => clipboard.copy(item.url)}
              flex="0 0 auto"
            >
              {clipboard.copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
            </ActionIcon>
          </Tooltip>
        </Group>
      </Table.Td>
      <Table.Td>
        <Text size="sm" c="dimmed" style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {item.comment}
        </Text>
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
      if (filteredItems.length > 0) (acc as any)[env] = filteredItems;
      return acc;
    }, {} as typeof db);
  }, [search]);

  return (
    <MantineProvider defaultColorScheme="dark">
      <Container size="lg" py="xl">
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
            <Accordion multiple defaultValue={Object.keys(db)}>
              {Object.entries(filteredData).map(([envName, items]) => (
                <Accordion.Item key={envName} value={envName}>
                  <Accordion.Control>
                    <Group justify="space-between" pr="md">
                      <Text fw={700} size="lg">{envName}</Text>
                      <Text size="xs" c="dimmed">{items.length} items</Text>
                    </Group>
                  </Accordion.Control>
                  
                  <Accordion.Panel>
                    <Table striped highlightOnHover verticalSpacing="sm" layout="fixed">
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th style={{ width: '20%' }}>Name</Table.Th>
                          <Table.Th style={{ width: '45%' }}>URL</Table.Th>
                          <Table.Th style={{ width: '25%' }}>Comment</Table.Th>
                          <Table.Th style={{ width: '10%' }}>Action</Table.Th>
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
