<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function getStats()
    {
        // Get current date and date 7 days ago
        $now = Carbon::now();
        $lastWeek = $now->copy()->subDays(7);
        
        // Calculate total revenue - include all orders regardless of status
        $totalRevenue = Order::sum('total_amount');
        
        // Calculate revenue from last week - include all orders
        $lastWeekRevenue = Order::whereBetween('created_at', [$lastWeek, $now])
            ->sum('total_amount');
        
        // Calculate revenue from previous week - include all orders
        $previousWeekStart = $lastWeek->copy()->subDays(7);
        $previousWeekRevenue = Order::whereBetween('created_at', [$previousWeekStart, $lastWeek])
            ->sum('total_amount');
        
        // Calculate revenue change percentage
        $revenueChange = $previousWeekRevenue > 0 
            ? round((($lastWeekRevenue - $previousWeekRevenue) / $previousWeekRevenue) * 100, 1)
            : ($lastWeekRevenue > 0 ? 100 : 0);
        
        // Get total orders
        $totalOrders = Order::count();
        
        // Get orders from last week
        $lastWeekOrders = Order::whereBetween('created_at', [$lastWeek, $now])->count();
        
        // Get orders from previous week
        $previousWeekOrders = Order::whereBetween('created_at', [$previousWeekStart, $lastWeek])->count();
        
        // Calculate orders change percentage
        $ordersChange = $previousWeekOrders > 0 
            ? round((($lastWeekOrders - $previousWeekOrders) / $previousWeekOrders) * 100, 1)
            : ($lastWeekOrders > 0 ? 100 : 0);
        
        // Get new customers (last 7 days)
        $newCustomers = Customer::whereBetween('created_at', [$lastWeek, $now])->count();
        
        // Get new customers from previous week
        $previousWeekCustomers = Customer::whereBetween('created_at', [$previousWeekStart, $lastWeek])->count();
        
        // Calculate customers change percentage
        $customersChange = $previousWeekCustomers > 0 
            ? round((($newCustomers - $previousWeekCustomers) / $previousWeekCustomers) * 100, 1)
            : ($newCustomers > 0 ? 100 : 0);
        
        // Get total products
        $totalProducts = Product::count();
        
        // Get products added in the last week
        $lastWeekProducts = Product::whereBetween('created_at', [$lastWeek, $now])->count();
        
        // Get products added in the previous week
        $previousWeekProducts = Product::whereBetween('created_at', [$previousWeekStart, $lastWeek])->count();
        
        // Calculate products change percentage
        $productsChange = $previousWeekProducts > 0 
            ? round((($lastWeekProducts - $previousWeekProducts) / $previousWeekProducts) * 100, 1)
            : ($lastWeekProducts > 0 ? 100 : 0);
        
        return response()->json([
            'total_revenue' => [
                'value' => number_format($totalRevenue, 2),
                'change' => $revenueChange,
                'trend' => $revenueChange >= 0 ? 'up' : 'down'
            ],
            'total_orders' => [
                'value' => $totalOrders,
                'change' => $ordersChange,
                'trend' => $ordersChange >= 0 ? 'up' : 'down'
            ],
            'new_customers' => [
                'value' => $newCustomers,
                'change' => $customersChange,
                'trend' => $customersChange >= 0 ? 'up' : 'down'
            ],
            'total_products' => [
                'value' => $totalProducts,
                'change' => $productsChange,
                'trend' => $productsChange >= 0 ? 'up' : 'down'
            ]
        ]);
    }
    
    public function getRecentOrders()
    {
        $recentOrders = Order::with('customer')
            ->orderBy('created_at', 'desc')
            ->take(5)
            ->get()
            ->map(function ($order) {
                return [
                    'id' => $order->order_number,
                    'customer' => $order->customer->name,
                    'date' => $order->created_at->format('Y-m-d'),
                    'amount' => number_format($order->total_amount, 2),
                    'status' => $order->status
                ];
            });
            
        return response()->json($recentOrders);
    }
    
    public function getTopProducts()
    {
        $topProducts = DB::table('order_items')
            ->join('products', 'order_items.product_id', '=', 'products.id')
            ->select('products.id', 'products.name', 'products.stock', 'products.price', 'products.image',
                    DB::raw('SUM(order_items.quantity) as total_sales'),
                    DB::raw('SUM(order_items.quantity * order_items.unit_price) as total_revenue'))
            ->groupBy('products.id', 'products.name', 'products.stock', 'products.price', 'products.image')
            ->orderBy('total_sales', 'desc')
            ->take(4)
            ->get()
            ->map(function ($product) {
                return [
                    'id' => $product->id,
                    'name' => $product->name,
                    'price' => $product->price,
                    'image' => $product->image,
                    'sales' => $product->total_sales,
                    'revenue' => number_format($product->total_revenue, 2),
                    'stock' => $product->stock
                ];
            });
            
        return response()->json($topProducts);
    }
    
    public function getRevenueChart()
    {
        // Get data for the last 30 days
        $days = 30;
        $startDate = Carbon::now()->subDays($days);
        
        $revenueData = Order::where('created_at', '>=', $startDate)
            ->select(
                DB::raw('DATE(created_at) as date'),
                DB::raw('SUM(total_amount) as revenue')
            )
            ->groupBy('date')
            ->orderBy('date')
            ->get();
            
        // Format data for chart
        $labels = [];
        $data = [];
        
        for ($i = 0; $i <= $days; $i++) {
            $date = $startDate->copy()->addDays($i)->format('Y-m-d');
            $labels[] = $startDate->copy()->addDays($i)->format('M d');
            
            $revenue = $revenueData->where('date', $date)->first();
            $data[] = $revenue ? $revenue->revenue : 0;
        }
        
        return response()->json([
            'labels' => $labels,
            'data' => $data
        ]);
    }
    
    public function getSalesDistribution()
    {
        // Get sales by category
        $salesByCategory = DB::table('order_items')
            ->join('products', 'order_items.product_id', '=', 'products.id')
            ->select('products.category', DB::raw('SUM(order_items.quantity) as total_sales'))
            ->groupBy('products.category')
            ->orderBy('total_sales', 'desc')
            ->get();
            
        return response()->json($salesByCategory);
    }
} 