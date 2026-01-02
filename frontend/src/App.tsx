import '@mantine/core/styles.css';
import { 
  MantineProvider, 
  Container, 
  Table, 
  Accordion, 
  Text, 
  Anchor, 
  Button,
  Title,
  ActionIcon,
  Group,
  Tooltip
} from '@mantine/core';
import { useClipboard } from '@mantine/hooks';
import { IconCopy, IconCheck } from '@tabler/icons-react';

const db = {
  "Test": [
    { "name": "Test API 2", "url": "https://test-api1.example.com", "comment": "" },
    { "name": "Test Website", "url": "https://test.example.com", "comment": "Frontend" }
  ],
  "UAT": [
    { "name": "UAT API", "url": "https://uat-api.example.com", "comment": "Staging" }
  ],
  "Production": [
    { "name": "Production API", "url": "https://api.example.com", "comment": "Live" }
  ]
};

// 1. Create a separate component for the Row
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
          variant="light"
        >
          Open
        </Button>
      </Table.Td>
    </Table.Tr>
  );
}

export default function App() {
  const environments = Object.keys(db);

  return (
    <MantineProvider defaultColorScheme="dark">
      <Container size="md" py="xl">
        <Title order={2} mb="xl" ta="center">urler</Title>

        <Accordion multiple defaultValue={environments}>
          {Object.entries(db).map(([envName, items]) => (
            <Accordion.Item key={envName} value={envName}>
              <Accordion.Control>
                <Text fw={700} size="lg">{envName}</Text>
              </Accordion.Control>
              
              <Accordion.Panel>
                <Table striped highlightOnHover verticalSpacing="sm">
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Name</Table.Th>
                      <Table.Th>URL</Table.Th>
                      <Table.Th>Comment</Table.Th>
                      <Table.Th>Actions</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {items.map((item, index) => (
                      <UrlRow key={index} item={item} />
                    ))}
                  </Table.Tbody>
                </Table>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </Container>
    </MantineProvider>
  );
}
