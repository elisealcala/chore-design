import React from 'react';
import { createRoot } from 'react-dom/client';
import { Button } from '../../../registry/ui/button';
import { Input } from '../../../registry/ui/input';
import { Textarea } from '../../../registry/ui/textarea';
import { Label } from '../../../registry/ui/label';
import { Checkbox } from '../../../registry/ui/checkbox';
import { Select } from '../../../registry/ui/select';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '../../../registry/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../../registry/ui/tabs';
import { Card } from '../../../registry/ui/card';
import { Badge } from '../../../registry/ui/badge';
import { Table, TableHead, TableCell } from '../../../registry/ui/table';
import { Separator } from '../../../registry/ui/separator';
import { Container } from '../../../registry/compositions/container';
import { PageIntro } from '../../../registry/compositions/page-intro';
import { Section } from '../../../registry/compositions/section';
import { EmptyState } from '../../../registry/compositions/empty-state';

createRoot(document.getElementById('root')!).render(<Container>
  <PageIntro title="Component examples" description="Accessibility test fixture" />
  <Section title="Controls">
    <Label htmlFor="name">Name</Label><Input id="name" />
    <Label htmlFor="notes">Notes</Label><Textarea id="notes" />
    <Label htmlFor="consent">Consent</Label><Checkbox id="consent" />
    <Label htmlFor="choice">Choice</Label><Select id="choice" defaultValue=""><option value="" disabled>Choose</option><option value="one">One</option><option value="two">Two</option></Select>
    <Button disabled>Unavailable</Button>
    <Dialog><DialogTrigger asChild><Button>Open dialog</Button></DialogTrigger><DialogContent><DialogTitle>Example dialog</DialogTitle><DialogDescription>Dialog description</DialogDescription><DialogClose asChild><Button>Close dialog</Button></DialogClose></DialogContent></Dialog>
    <Tabs defaultValue="first"><TabsList aria-label="Examples"><TabsTrigger value="first">First</TabsTrigger><TabsTrigger value="second">Second</TabsTrigger></TabsList><TabsContent value="first">First panel</TabsContent><TabsContent value="second">Second panel</TabsContent></Tabs>
  </Section>
  <Separator /><Section title="Content"><Card><Badge>Active</Badge><Table><caption>Example data</caption><thead><tr><TableHead scope="col">Name</TableHead></tr></thead><tbody><tr><TableCell>Example</TableCell></tr></tbody></Table></Card><EmptyState title="No items" description="Nothing here yet." /></Section>
</Container>);
