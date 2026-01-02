import '@mantine/core/styles.css';
import { 
  MantineProvider, 
  Container, 
  Table, 
  Accordion, 
  Text, 
  Anchor, 
  Button,
  Title
} from '@mantine/core';

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
                      <Table.Th>Action</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {items.map((item, index) => (
                      <Table.Tr key={index}>
                        <Table.Td fw={500}>{item.name}</Table.Td>
                        <Table.Td>
                          <Anchor href={item.url} target="_blank" size="sm">
                            {item.url}
                          </Anchor>
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
