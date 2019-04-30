class CreatePosts < ActiveRecord::Migration[5.2]
  def change
    create_table :posts do |t|
      t.string :name
      t.datetime :start_time
      t.datetime :end_time
      t.string :description
      t.integer :user_id
      t.integer :platform_id
      t.timestamps
    end
  end
end
