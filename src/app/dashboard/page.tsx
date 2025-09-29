'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Edit, Trash2, Eye, MoreHorizontal, TrendingUp, DollarSign, Heart, MessageCircle, Users, Star, Filter, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CatCard from '@/components/CatCard';
import { mockCats, mockBreeders } from '@/lib/mockData';

export default function BreederDashboard() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');

  // Mock current breeder (in real app, this would come from authentication)
  const currentBreeder = mockBreeders[0]; // Golden Bengal Cattery
  const breederCats = mockCats.filter(cat => cat.breeder.name === currentBreeder.name);

  const filteredCats = breederCats.filter(cat => {
    const matchesSearch = searchQuery === '' ||
      cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cat.breed.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || cat.availability.toLowerCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalCats: breederCats.length,
    availableCats: breederCats.filter(cat => cat.availability === 'Available').length,
    reservedCats: breederCats.filter(cat => cat.availability === 'Reserved').length,
    soldCats: breederCats.filter(cat => cat.availability === 'Sold').length,
    totalViews: 1247,
    totalInquiries: 89,
    averagePrice: Math.round(breederCats.reduce((sum, cat) => sum + (cat.price || 0), 0) / breederCats.length),
    totalRevenue: breederCats.filter(cat => cat.availability === 'Sold').reduce((sum, cat) => sum + (cat.price || 0), 0)
  };

  const recentInquiries = [
    {
      id: '1',
      catName: 'Zara',
      inquirer: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      message: 'Hi, I\'m very interested in Zara. Could we schedule a visit this weekend?',
      date: '2 hours ago',
      status: 'new'
    },
    {
      id: '2',
      catName: 'Copper',
      inquirer: 'Michael Chen',
      email: 'mchen@email.com',
      message: 'What are the health test results for Copper? Also interested in the parents\' lineage.',
      date: '1 day ago',
      status: 'responded'
    },
    {
      id: '3',
      catName: 'Zara',
      inquirer: 'Emma Davis',
      email: 'emma.davis@email.com',
      message: 'Is Zara still available? I can make a deposit today.',
      date: '2 days ago',
      status: 'responded'
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available':
        return 'bg-green-100 text-green-800';
      case 'Reserved':
        return 'bg-yellow-100 text-yellow-800';
      case 'Sold':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getInquiryStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-800';
      case 'responded':
        return 'bg-green-100 text-green-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <Header />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-forest-green mb-2">
              Breeder Dashboard
            </h1>
            <p className="text-gray-600">
              Welcome back, {currentBreeder.name}
            </p>
          </div>
          <Button className="bg-forest-green hover:bg-forest-green-dark text-cream">
            <Plus className="w-4 h-4 mr-2" />
            Add New Listing
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Cats</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-forest-green">{stats.totalCats}</div>
              <p className="text-xs text-muted-foreground">
                {stats.availableCats} available
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-forest-green">{stats.totalViews.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Inquiries</CardTitle>
              <MessageCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-forest-green">{stats.totalInquiries}</div>
              <p className="text-xs text-muted-foreground">
                3 new this week
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-forest-green">{formatPrice(stats.totalRevenue)}</div>
              <p className="text-xs text-muted-foreground">
                Avg: {formatPrice(stats.averagePrice)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="listings" className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
            <TabsTrigger value="listings" className="data-[state=active]:bg-warm-gold data-[state=active]:text-forest-green">
              My Listings ({filteredCats.length})
            </TabsTrigger>
            <TabsTrigger value="inquiries" className="data-[state=active]:bg-warm-gold data-[state=active]:text-forest-green">
              Inquiries ({recentInquiries.filter(i => i.status === 'new').length})
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-warm-gold data-[state=active]:text-forest-green">
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Listings Tab */}
          <TabsContent value="listings" className="mt-6">
            {/* Search and Filter */}
            <div className="bg-white rounded-lg p-4 mb-6 border border-gray-200">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="Search your listings..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="reserved">Reserved</SelectItem>
                      <SelectItem value="sold">Sold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="price-high">Highest Price</SelectItem>
                    <SelectItem value="price-low">Lowest Price</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Listings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredCats.map((cat) => (
                <div key={cat.id} className="relative group">
                  <CatCard {...cat} />

                  {/* Management Actions Overlay */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/cat/${cat.id}`}>
                            <Eye className="w-4 h-4 mr-2" />
                            View Public Page
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Listing
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <TrendingUp className="w-4 h-4 mr-2" />
                          View Analytics
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Listing
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {/* Quick Status Update */}
                  <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Select defaultValue={cat.availability.toLowerCase()}>
                      <SelectTrigger className="w-32 h-8 bg-white/90 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="reserved">Reserved</SelectItem>
                        <SelectItem value="sold">Sold</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ))}
            </div>

            {filteredCats.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No listings found</h3>
                <p className="text-gray-600 mb-4">
                  No cats match your current search and filter criteria
                </p>
              </div>
            )}
          </TabsContent>

          {/* Inquiries Tab */}
          <TabsContent value="inquiries" className="mt-6">
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="font-heading text-lg font-semibold text-forest-green">Recent Inquiries</h3>
              </div>

              <div className="divide-y divide-gray-200">
                {recentInquiries.map((inquiry) => (
                  <div key={inquiry.id} className="p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-gray-900">{inquiry.inquirer}</h4>
                          <Badge className={`text-xs ${getInquiryStatusColor(inquiry.status)}`}>
                            {inquiry.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{inquiry.email}</p>
                        <p className="text-sm text-gray-500">Interested in: <span className="font-medium">{inquiry.catName}</span></p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500">{inquiry.date}</span>
                        <Button size="sm" variant="outline">
                          <MessageCircle className="w-4 h-4 mr-1" />
                          Reply
                        </Button>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded-md italic">
                      "{inquiry.message}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-forest-green">Performance Overview</CardTitle>
                  <CardDescription>
                    Your listing performance over the last 30 days
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Views</span>
                    <span className="font-semibold">{stats.totalViews.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Inquiries</span>
                    <span className="font-semibold">{stats.totalInquiries}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Conversion Rate</span>
                    <span className="font-semibold">7.1%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Avg. Response Time</span>
                    <span className="font-semibold">2.3 hours</span>
                  </div>
                </CardContent>
              </Card>

              {/* Top Performing Listings */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-forest-green">Top Performing Cats</CardTitle>
                  <CardDescription>
                    Most viewed and inquired about listings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {breederCats.slice(0, 3).map((cat, index) => (
                      <div key={cat.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-warm-gold text-forest-green rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{cat.name}</p>
                            <p className="text-xs text-gray-600">{cat.breed}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold">{Math.floor(Math.random() * 200) + 50} views</p>
                          <p className="text-xs text-gray-600">{Math.floor(Math.random() * 20) + 5} inquiries</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
}