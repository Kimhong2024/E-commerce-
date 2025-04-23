import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import 'react-toastify/dist/ReactToastify.css';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

// Configure axios base URL
axios.defaults.baseURL = 'http://localhost:8000/api';

function Home() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [revenueChartData, setRevenueChartData] = useState(null);
  const [salesDistributionData, setSalesDistributionData] = useState(null);
  const [timeRange, setTimeRange] = useState('7days');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all dashboard data in parallel
      const [
        statsResponse,
        recentOrdersResponse,
        topProductsResponse,
        revenueChartResponse,
        salesDistributionResponse
      ] = await Promise.all([
        axios.get('/dashboard/stats'),
        axios.get('/dashboard/recent-orders'),
        axios.get('/dashboard/top-products'),
        axios.get('/dashboard/revenue-chart'),
        axios.get('/dashboard/sales-distribution')
      ]);
      
      // Process stats data
      const statsData = [
        { 
          title: 'Total Revenue', 
          value: `$${statsResponse.data.total_revenue.value}`, 
          icon: 'ri-money-dollar-circle-line', 
          trend: statsResponse.data.total_revenue.trend, 
          change: `${statsResponse.data.total_revenue.change}%` 
        },
        { 
          title: 'Total Orders', 
          value: statsResponse.data.total_orders.value, 
          icon: 'ri-shopping-cart-2-line', 
          trend: statsResponse.data.total_orders.trend, 
          change: `${statsResponse.data.total_orders.change}%` 
        },
        { 
          title: 'New Customers', 
          value: statsResponse.data.new_customers.value, 
          icon: 'ri-user-add-line', 
          trend: statsResponse.data.new_customers.trend, 
          change: `${statsResponse.data.new_customers.change}%` 
        },
        { 
          title: 'Total Product', 
          value: statsResponse.data.total_products.value, 
          icon: 'ri-product-hunt-line', 
          trend: statsResponse.data.total_products.trend, 
          change: `${statsResponse.data.total_products.change}%` 
        }
      ];
      
      setStats(statsData);
      setRecentOrders(recentOrdersResponse.data);
      setTopProducts(topProductsResponse.data);
      
      // Process revenue chart data
      const revenueData = {
        labels: revenueChartResponse.data.labels,
        datasets: [
          {
            label: 'Revenue',
            data: revenueChartResponse.data.data,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            tension: 0.3
          }
        ]
      };
      
      setRevenueChartData(revenueData);
      
      // Process sales distribution data
      const salesData = {
        labels: salesDistributionResponse.data.map(item => item.category),
        datasets: [
          {
            data: salesDistributionResponse.data.map(item => item.total_sales),
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
              'rgba(54, 162, 235, 0.5)',
              'rgba(255, 206, 86, 0.5)',
              'rgba(75, 192, 192, 0.5)',
              'rgba(153, 102, 255, 0.5)',
              'rgba(255, 159, 64, 0.5)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }
        ]
      };
      
      setSalesDistributionData(salesData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleTimeRangeChange = (range) => {
    setTimeRange(range);
    // In a real app, you would fetch data for the selected time range
    // For now, we'll just update the state
  };

  const handleClick = (e) => {
    e.preventDefault();
    // Add your click handler logic here
  };

  // Helper function for status colors
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'processing':
        return 'info';
      case 'pending':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        {/* Sidebar Menu - Same as Product.jsx */}

        {/* Layout container */}
        <div className="layout-page">
          
          {/* Content wrapper */}
          <div className="content-wrapper">
            {/* Content */}
            <div className="container-xxl flex-grow-1 container-p-y">
              <h4 className="fw-bold mb-4">Dashboard</h4>

              {/* Stats Cards */}
              <div className="row mb-4">
                {loading ? (
                  // Loading skeleton for stats
                  Array(4).fill(0).map((_, index) => (
                    <div key={index} className="col-md-6 col-lg-3 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <div>
                              <div className="skeleton-text mb-2" style={{ width: '100px', height: '16px', backgroundColor: '#e9ecef' }}></div>
                              <div className="skeleton-text" style={{ width: '80px', height: '24px', backgroundColor: '#e9ecef' }}></div>
                            </div>
                            <div className="avatar avatar-sm p-2 bg-label-primary">
                              <i className="ri-money-dollar-circle-line fs-4 text-primary"></i>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  // Actual stats data
                  stats.map((stat, index) => (
                    <div key={index} className="col-md-6 col-lg-3 mb-4">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex justify-content-between">
                            <div>
                              <h6 className="mb-2 text-muted">{stat.title}</h6>
                              <h3 className="mb-0">{stat.value}</h3>
                            </div>
                            <div className={`avatar avatar-sm p-2 bg-label-${stat.trend === 'up' ? 'success' : 'danger'}`}>
                              <i className={`${stat.icon} fs-4 text-${stat.trend === 'up' ? 'success' : 'danger'}`} />
                            </div>
                          </div>
                          <small className={`text-${stat.trend === 'up' ? 'success' : 'danger'}`}>
                            <i className={`ri-arrow-${stat.trend}-line`} /> {stat.change} vs last week
                          </small>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Charts Row */}
              <div className="row mb-4">
                {/* Revenue Chart */}
                <div className="col-lg-8 mb-4">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Revenue Overview</h5>
                      <div className="dropdown">
                        <button className="btn p-0" type="button" data-bs-toggle="dropdown">
                          <i className="ri-more-2-line" />
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                          <li><a className={`dropdown-item ${timeRange === '7days' ? 'active' : ''}`} href="#" onClick={() => handleTimeRangeChange('7days')}>Last 7 Days</a></li>
                          <li><a className={`dropdown-item ${timeRange === '30days' ? 'active' : ''}`} href="#" onClick={() => handleTimeRangeChange('30days')}>Last 30 Days</a></li>
                          <li><a className={`dropdown-item ${timeRange === '90days' ? 'active' : ''}`} href="#" onClick={() => handleTimeRangeChange('90days')}>Last 90 Days</a></li>
                        </ul>
                      </div>
                    </div>
                    <div className="card-body">
                      {loading ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                          <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      ) : revenueChartData ? (
                        <div style={{ height: '300px' }}>
                          <Line 
                            data={revenueChartData} 
                            options={{
                              responsive: true,
                              maintainAspectRatio: false,
                              plugins: {
                                legend: {
                                  display: false
                                }
                              },
                              scales: {
                                y: {
                                  beginAtZero: true,
                                  ticks: {
                                    callback: function(value) {
                                      return '$' + value;
                                    }
                                  }
                                }
                              }
                            }}
                          />
                        </div>
                      ) : (
                        <div className="bg-light rounded text-center p-5">
                          <p className="mb-0">No revenue data available</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Sales Chart */}
                <div className="col-lg-4 mb-4">
                  <div className="card">
                    <div className="card-header">
                      <h5 className="mb-0">Sales Distribution</h5>
                    </div>
                    <div className="card-body">
                      {loading ? (
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                          <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      ) : salesDistributionData ? (
                        <div style={{ height: '300px' }}>
                          <Doughnut 
                            data={salesDistributionData} 
                            options={{
                              responsive: true,
                              maintainAspectRatio: false,
                              plugins: {
                                legend: {
                                  position: 'bottom'
                                }
                              }
                            }}
                          />
                        </div>
                      ) : (
                        <div className="bg-light rounded text-center p-5">
                          <p className="mb-0">No sales distribution data available</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Orders & Top Products */}
              <div className="row">
                {/* Recent Orders */}
                <div className="col-lg-8 mb-4">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Recent Orders</h5>
                      <a href="#" className="btn btn-sm btn-outline-primary" onClick={handleClick}>View All</a>
                    </div>
                    <div className="table-responsive">
                      {loading ? (
                        <div className="d-flex justify-content-center align-items-center p-5">
                          <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      ) : recentOrders.length > 0 ? (
                        <table className="table table-hover">
                          <thead>
                            <tr>
                              <th>Order ID</th>
                              <th>Customer</th>
                              <th>Date</th>
                              <th>Amount</th>
                              <th>Status</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {recentOrders.map((order, index) => (
                              <tr key={index}>
                                <td>{order.id}</td>
                                <td>{order.customer}</td>
                                <td>{order.date}</td>
                                <td>${order.amount}</td>
                                <td>
                                  <span className={`badge bg-${getStatusColor(order.status)}`}>
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                  </span>
                                </td>
                                <td>
                                  <button className="btn btn-sm btn-outline-primary">
                                    <i className="ri-eye-line" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <div className="text-center p-5">
                          <p className="mb-0">No recent orders found</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Top Products */}
                <div className="col-lg-4 mb-4">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <h5 className="mb-0">Top Products</h5>
                      <a href="#" className="btn btn-sm btn-outline-primary" onClick={handleClick}>View All</a>
                    </div>
                    <div className="card-body">
                      {loading ? (
                        <div className="d-flex justify-content-center align-items-center p-5">
                          <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </div>
                      ) : topProducts.length > 0 ? (
                        <ul className="list-unstyled mb-0">
                          {topProducts.map((product, index) => (
                            <li key={index} className="mb-3">
                              <div className="d-flex align-items-center">
                                <div className="avatar avatar-sm me-3">
                                  <span className="avatar-initial rounded bg-label-primary">
                                    {product.name.charAt(0)}
                                  </span>
                                </div>
                                <div className="flex-grow-1">
                                  <h6 className="mb-0">{product.name}</h6>
                                  <small className="text-muted">{product.sales} sales | ${product.revenue}</small>
                                </div>
                                <span className={`badge bg-label-${product.stock > 20 ? 'success' : 'warning'}`}>
                                  {product.stock} in stock
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="text-center p-5">
                          <p className="mb-0">No top products found</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer - Same as Product.jsx */}
            <footer className="content-footer footer bg-footer-theme">
              <div className="container-xxl">
                <div className="footer-container d-flex align-items-center justify-content-between py-3 flex-md-row flex-column">
                  <div className="mb-2 mb-md-0">
                    © {new Date().getFullYear()}, made with <span className="text-danger">❤️</span> by Your Company
                  </div>
                  <div>
                    <a href="#" className="footer-link me-4" onClick={handleClick}>License</a>
                    <a href="#" className="footer-link me-4" onClick={handleClick}>Help</a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;